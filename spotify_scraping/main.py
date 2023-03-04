import requests
import base64
import json
import random
import time
from secrets import *

def main():
    all_collabs = json.load(open('collabs.json', 'r', encoding='utf8'))

    token = get_authorization_token()
    headers = {'Authorization' : f'Bearer {token}', 'Content-Type' : 'application/json', 'accept' : 'application/json'}
    artist_ids = ['5K4W6rqBFWDnAN6FQUkS6x']
    for artist_id in artist_ids:
        album_ids = get_albums(artist_id, headers)
        collabs = get_collabs(artist_id, album_ids, headers)
        artist_to_id, id_to_artist = update_artist_list(collabs, headers)
        for collab_id in collabs.keys():
            update_collabs(all_collabs, id_to_artist[artist_id], id_to_artist[collab_id], collabs[collab_id])
        json.dump(all_collabs, open('collabs.json', 'w', encoding='utf8'), ensure_ascii=False, indent=2)

def requests_try_catch(endpoint, headers):
    tries = 0
    while tries < 10:
        try:
            response = requests.get(endpoint, headers = headers)
            break
        except:
            time.sleep(0.1)
            print(f'API call failed for: {endpoint}')
    return response

def update_collabs(collabs, artist_name, collab_name, track):
    # create empty dict if doesn't exist
    if artist_name not in collabs:
        collabs[artist_name] = {}
    if collab_name not in collabs:
        collabs[collab_name] = {}
    # add collab
    if collab_name not in collabs[artist_name]:
        collabs[artist_name][collab_name] = track
        collabs[collab_name][artist_name] = track

def update_artist_list(collabs, headers):
    artist_to_id = json.load(open('artist_to_id.json', 'r', encoding='utf8'))

    for artist_id in collabs.keys():
        if artist_id not in artist_to_id:
            endpoint = f'https://api.spotify.com/v1/artists/{artist_id}'
            # response = requests.get(endpoint, headers = headers)
            response = requests_try_catch(endpoint, headers = headers)
            while response.status_code == 429:
                seconds_to_wait = int(response.headers['Retry-After'])
                print(f'Rate limit reached for Spotify API. Retrying in {seconds_to_wait} seconds.')
                time.sleep(seconds_to_wait)
                response = requests.get(endpoint, headers = headers)  
            if response.status_code != 200:
                print(f'API call failed with status code {response.status_code}: {response.reason}')
                continue
            artist_to_id[response.json()['name']] = artist_id
            response.close()

    json.dump(artist_to_id, open('artist_to_id.json', 'w', encoding='utf8'), ensure_ascii=False, indent=2)
    id_to_artist = {val : key for key, val in artist_to_id.items()}
    return artist_to_id, id_to_artist

def get_collabs(artist_id, album_ids, headers):
    collabs = {}
    for x, album_id in enumerate(album_ids):
        if x % 50 == 0:
            print(x)
        endpoint = f'https://api.spotify.com/v1/albums/{album_id}/tracks'
        # response = requests.get(endpoint, headers = headers)  
        response = requests_try_catch(endpoint, headers = headers)
        while response.status_code == 429:
            seconds_to_wait = int(response.headers['Retry-After'])
            print(f'Rate limit reached for Spotify API. Retrying in {seconds_to_wait} seconds.')
            time.sleep(seconds_to_wait)
            response = requests.get(endpoint, headers = headers)  
        if response.status_code != 200:
            print(f'API call failed with status code {response.status_code}: {response.reason}')
            return collabs
        data = response.json()
        for track in data['items']:
            if len(track['artists']) > 1:
                track_name = track['name'] 
                for collaborator in track['artists']:
                    if collaborator['id'] == artist_id:
                        continue
                    if collaborator['id'] not in collabs:
                            collabs[collaborator['id']] = track_name
        response.close()
    json.dump(collabs, open('ye_collabs.json', 'w'), indent=2)
    return collabs

def get_albums(artist_id, headers):
    albums = []
    endpoint = f'https://api.spotify.com/v1/artists/{artist_id}/albums?limit=50&offset=0'
    while endpoint:
        # response = requests.get(endpoint, headers = headers)
        response = requests_try_catch(endpoint, headers = headers)
        if response.status_code == 429:
            seconds_to_wait = int(response.headers['Retry-After'])
            print(f'Rate limit reached for Spotify API. Retrying in {seconds_to_wait} seconds.')
            time.sleep(seconds_to_wait)
            continue
        elif response.status_code != 200:
            print(f'API call failed with status code {response.status_code}: {response.reason}')
            return albums
        data = response.json()
        albums += [album['id'] for album in data['items']]
        endpoint = data['next']
        response.close()
    return albums

def get_authorization_token():
    client_id, client_secret, refresh_token = get_spotify_credentials()
    url = "https://accounts.spotify.com/api/token"
    headers = {}
    data = {}
    message = f"{client_id}:{client_secret}"
    messageBytes = message.encode('ascii')
    base64Bytes = base64.b64encode(messageBytes)
    base64Message = base64Bytes.decode('ascii')

    headers['Authorization'] = f"Basic {base64Message}"
    headers['Content-Type'] = 'application/x-www-form-urlencoded'
    data['grant_type'] = 'refresh_token'
    data['refresh_token'] = refresh_token


    r = requests.post(url, headers=headers, data=data)
    return  r.json()['access_token']

def get_spotify_credentials():
    credentials = json.load(open('../credentials.json'))
    return credentials['client_id'], credentials['client_secret'], credentials['refresh_token']

if __name__ == '__main__':
    main()