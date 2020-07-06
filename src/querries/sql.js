const sql ={
    selectall :'SELECT * FROM `reakcije` WHERE company=?',
    selectbyid:'SELECT * FROM reakcije WHERE id=? AND company=?',
    selectsettings:'SELECT * FROM postavke WHERE company=?',
    countreaction :'SELECT COUNT(emoticon) AS ispis FROM reakcije WHERE emoticon=? AND company=?',
    countreactionbydate:'SELECT COUNT(emoticon) AS ispis FROM reakcije WHERE date =? AND company=?',
    getuserbyname:'SELECT * FROM users WHERE name=?', 
    insertreaction:'INSERT INTO reakcije(date,emoticon.company) VALUES(?,?,?)',
    updatesettings:'UPDATE postavke SET poruka = ? , trajanjePoruke = ? , brojEmotikona =? WHERE company=?',
    createuser:'INSERT INTO users (name, password,lvl,company) VALUES (?,?,?,?)',
    deletereaction:'DELETE FROM reakcije WHERE id = ? AND company=?'
}

module.exports = sql;



/*
Novi level admina 3 master admin gotovo
register moze samo 3 za admine a 2 za usere  gotovo
register zabranit dupla imena gotovo gotovo
promjenit bazu podataka da je na insanskom jeziku aka englesh 
*/