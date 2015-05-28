from django.shortcuts import render
from django.http import HttpResponse, Http404
from django.template import RequestContext, loader
from django.views import generic

import redis
import json

r = redis.StrictRedis(host='localhost', port=1234, db=0)

def fill_db():
    r.set('movie:0', '{"name": "Django Unchained", "info": "Film over een zwarte man dat eigenlijk wit wilt worden. Jaar: 2012, Samual L jackson"}')
    r.set('movie:1', '{"name": "Titanic", "info": "Herbeleef het zinken van het meest onzinkbare schip ooit! Kinderen toegelaten! Jaar: 2001, Leonardo and Kate"}')
    r.set('movie:2', '{"name": "Tranformers", "info": "Rare robots die tegen elkaar vechten en soms veranderen in autos. Jaar: 2007 Sia, Megan"}')
    r.set('movie:3', '{"name": "The Shawshank Redemption", "info": "Man wordt onterecht in een gevangenis geplaatst en ontmoet morgan freeman. Jaar: 1993, Morgan Freeman"}')
    r.set('movie:4', '{"name": "Excuses", "info": "Deze film is niet beschikbaar!"}')


fill_db()

# Create your views here.
def index(request):
    
    movie_keys = r.keys('movie:*')
    movie_info = []
    course_info = []
    movies = []
    for l in movie_keys:
        movie_id = l.split(':')[1]
        json.loads(r.get(l))
        movie = {}
        movie['name'] = json.loads(r.get(l))['name']
        movies.append(movie)

    return render(request, 'movies/index.html', {'movies': movies})

def lecturer(request,movie_name):
    

    movie_keys = r.keys('movie:*')
    backup = {}
    movie = {}
    for l in movie_keys:
        movie_t = json.loads(r.get(l))
        if movie_t['name'] == movie_name:
            movie = movie_t
            movie_id = l.split(':')[1]
        #else:
            # movie = json.loads(r.get(movie_keys[4]))  



    return render(request, 'movies/movie.html', {'movie': movie})


