from django.core.management.base import BaseCommand, CommandError

import inspect

from djbr import models

import csv

class Command(BaseCommand):
    help = 'Seeds the database with the specified file'

    def add_arguments(self, parser):
        parser.add_argument('model', type=str)
        parser.add_argument('seed_file', type=str)

    def handle(self, *args, **options):
        djbr_models = inspect.getmembers(models, inspect.isclass)
        to_seed = None
        for djbr_model in djbr_models:
            if djbr_model[0] == options['model']:
                to_seed = djbr_model[1]
                break
        if not to_seed:
            return
        with open(options['seed_file']) as seed_file:
            seed_reader = csv.reader(seed_file, skipinitialspace=True)
            headers = next(seed_reader)
            for row in seed_reader:
                obj = to_seed()
                for attr, value in zip(headers, row):
                    print(attr, value)
                    setattr(obj, attr, value)
                print('saving', obj)
                obj.save()
              
    
