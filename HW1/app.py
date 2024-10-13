from flask import Flask, render_template, request, redirect
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:qaz15988@localhost:3306/SPORT'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class UserInfo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    hometown = db.Column(db.String(100), nullable=False)
    sports = db.Column(db.String(100), nullable=False)
    learned_years = db.Column(db.Integer, nullable=False)

with app.app_context():
    db.create_all()

@app.route('/')
def index():
    users = UserInfo.query.all()
    return render_template('index.html', users=users)

@app.route('/submit', methods=['POST'])
def submit():
    name = request.form['name']
    hometown = request.form['hometown']
    sports = request.form['sports']
    learned_years = request.form['learned_years']
    
    new_user = UserInfo(name=name, hometown=hometown, sports=sports, learned_years=int(learned_years))
    
    db.session.add(new_user)
    db.session.commit()

    return redirect('/')

@app.route('/delete/<int:id>', methods=['POST'])
def delete(id):
    user_to_delete = UserInfo.query.get_or_404(id)
  
    db.session.delete(user_to_delete)
    db.session.commit()
    
    return redirect('/')

if __name__ == '__main__':
    app.run(debug=True)
