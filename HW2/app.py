from flask import Flask, render_template, request, redirect, url_for
from database import execute_query, fetch_all  
from join import join_blueprint

app = Flask(__name__)

# 註冊 Blueprint
app.register_blueprint(join_blueprint)

@app.route('/')
def index():
    # 獲取所有運動員的資料
    athletes = fetch_all("SELECT * FROM Athlete")
    sports = fetch_all("SELECT * FROM Sport")
    metrics = fetch_all("SELECT * FROM BodyMetrics")
    return render_template('index.html', athletes=athletes, sports=sports, metrics=metrics)

# 增加運動員
@app.route('/add_athlete', methods=['POST'])
def add_athlete():
    name = request.form['name']
    age = request.form['age']
    country = request.form['country']
    execute_query("INSERT INTO Athlete (Name, Age, Country) VALUES (%s, %s, %s)", (name, age, country))
    return redirect(url_for('index'))

# 更新運動員
@app.route('/update_athlete/<int:athlete_id>', methods=['POST'])
def update_athlete(athlete_id):
    age = request.form['age']
    execute_query("UPDATE Athlete SET Age = %s WHERE AthleteID = %s", (age, athlete_id))
    return redirect(url_for('index'))

# 刪除運動員
@app.route('/delete_athlete/<int:athlete_id>')
def delete_athlete(athlete_id):
    execute_query("DELETE FROM Athlete WHERE AthleteID = %s", (athlete_id,))
    return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(debug=True)
