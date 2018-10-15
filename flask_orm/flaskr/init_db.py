import click

from flask.cli import with_appcontext

from flaskr import db

@click.command('init-db')
@with_appcontext
def init_db_command():
    """Clear the existing data and create new tables."""
    db.drop_all()
    db.create_all()
    click.echo('Initialized the database.')

def init_db(app):
    app.cli.add_command(init_db_command)
