from flask import Flask, render_template, request, session
from flask_socketio import SocketIO, emit, join_room


app = Flask(__name__)
socketio = SocketIO(app)

clients = []

@app.route('/')
def index():
    return render_template('index.html')

@socketio.on('connect')
def joined():
    clients.append(request.sid)
    room = session.get('room')
    join_room(room)
    send_data()

def send_data():
    for i in clients:
        emit('after connect', {'data': i}, room=i)










if __name__ == '__main__':
    socketio.run(app)