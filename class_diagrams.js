const username = "targetUser";

const sql = `
    SELECT *
    FROM BaseUser
    WHERE UserName = ?

    SELECT 
        b.*, 
        CASE
            WHEN r.UserID IS NOT NULL THEN 'Renter'
            WHEN l.UserID IS NOT NULL THEN 'Landlord'
            WHEN a.UserID IS NOT NULL THEN 'Admin'
        END AS UserType
    FROM BaseUser b
    LEFT JOIN Renters r ON b.UserID = r.UserID
    LEFT JOIN Landlord l ON b.UserID = l.UserID
    LEFT JOIN Admin a ON b.UserID = a.UserID
    WHERE b.UserName = ?
`;

connection.query(sql, [username], (err, results) => {
    if (err) throw err;

    console.log(results);
});


connection.query(sql, [username], (err, results) => {
    if (err) throw err;

    console.log(results);
});
