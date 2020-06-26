const sql ={
    selectall :'SELECT * FROM `reakcije`',
    selectbyid:'SELECT * FROM reakcije WHERE id=?',
    selectsettings:'SELECT * FROM postavke',
    countreaction :'SELECT COUNT(emoticon) AS ispis FROM reakcije WHERE emoticon=?',
    countreactionbydate:'SELECT COUNT(emoticon) AS ispis FROM reakcije WHERE date =?',
    getuserbyname:'SELECT * FROM users WHERE name=?',
    insertreaction:'INSERT INTO reakcije(date,emoticon) VALUES(?,?)',
    updatesettings:'UPDATE postavke SET poruka = ? , trajanjePoruke = ? , brojEmotikona =?',
    createuser:'INSERT INTO users (name, password) VALUES (?,?)',
    deletereaction:'DELETE FROM reakcije WHERE id = ?}'
}

module.exports = sql;