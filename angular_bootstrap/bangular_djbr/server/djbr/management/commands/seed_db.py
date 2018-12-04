from django.core.management.base import BaseCommand, CommandError

import inspect

from djbr import models

import csv

class Command(BaseCommand):
    help = 'Seeds the database with the specified file'

    def add_arguments(self, parser):
        parser.add_argument('model', type=str)
        parser.add_argument('seed_file', type=str)
        parser.add_argument('-s', '--simulate',
                            action='store_true',
                            dest='simulate',
                            help='Show actions without saving')

    def handle(self, *args, **options):
        djbr_models = inspect.getmembers(models, inspect.isclass)
        ModelToSeed = None
        for djbr_model in djbr_models:
            if djbr_model[0] == options['model']:
                ModelToSeed = djbr_model[1]
                break
        if not ModelToSeed:
            return
        with open(options['seed_file']) as seed_file:
            seed_reader = csv.reader(seed_file, skipinitialspace=True)
            headers = next(seed_reader)
            for row in seed_reader:
                obj = ModelToSeed()
                for attr, value in zip(headers, row):
                    setattr(obj, attr, value)
                if options['simulate']:
                    print('would save', obj)
                else:
                    print('saving', obj)                    
                    obj.save()

