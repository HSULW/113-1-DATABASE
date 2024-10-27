from flask import Blueprint, render_template, request, redirect, url_for
from database import execute_query, fetch_all

join_blueprint = Blueprint('join', __name__)

@join_blueprint.route('/join')
def join_data():
    query = '''
        SELECT A.Name, A.Country, S.SportName, B.Height, B.Weight, B.BMI
        FROM Athlete A
        JOIN Participation P ON A.AthleteID = P.AthleteID
        JOIN Sport S ON P.SportID = S.SportID
        JOIN BodyMetrics B ON A.AthleteID = B.AthleteID;
    '''
    result = fetch_all(query)
    return render_template('join.html', data=result)

# 處理新增運動員資料的路由
@join_blueprint.route('/add_athlete', methods=['POST'])
def add_athlete():
    # 從表單接收數據
    name = request.form['name']
    age = request.form['age']
    country = request.form['country']
    sport_name = request.form['sport_name']
    category = request.form['category']
    height = request.form['height']
    weight = request.form['weight']
    
    # 計算 BMI
    bmi = round(float(weight) / ((float(height) / 100) ** 2), 2)
    
    # 插入運動員基本資料
    execute_query("INSERT INTO Athlete (Name, Age, Country) VALUES (%s, %s, %s)", (name, age, country))
    
    # 插入運動項目（假設運動項目是唯一的）
    execute_query("INSERT IGNORE INTO Sport (SportName, Category) VALUES (%s, %s)", (sport_name, category))
    
    # 獲取剛插入的 AthleteID 和 SportID
    athlete_id = fetch_all("SELECT AthleteID FROM Athlete WHERE Name = %s AND Country = %s", (name, country))[0]['AthleteID']
    sport_id = fetch_all("SELECT SportID FROM Sport WHERE SportName = %s", (sport_name,))[0]['SportID']
    
    # 插入身體指數資料
    execute_query("INSERT INTO BodyMetrics (AthleteID, Height, Weight, BMI) VALUES (%s, %s, %s, %s)", (athlete_id, height, weight, bmi))
    
    # 插入參加關係
    execute_query("INSERT INTO Participation (AthleteID, SportID) VALUES (%s, %s)", (athlete_id, sport_id))
    
    # 重定向到聯合查詢頁面，刷新顯示數據
    return redirect(url_for('join.join_data'))
