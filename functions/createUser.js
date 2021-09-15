const createUser = (db, dateString, social_id, name, social_network, res) => {
  db.query("SELECT * FROM users WHERE social_id=$1", [social_id])
    .then((result) => {
      if (
        result.rows.length > 0 &&
        result.rows[0].status.replace(/\s/g, "") === "blocked"
      ) {
        return res.send({ loggedIn: false });
      } else if (
        result.rows.length > 0 &&
        result.rows[0].status.replace(/\s/g, "") == "active"
      ) {
        db.query("UPDATE users SET lastLogin=$1 WHERE social_id=$2", [
          dateString,
          social_id,
        ]);
        return res.send({ loggedIn: true });
      } else if (result.rows.length === 0) {
        db.query(
          "INSERT INTO users(social_id, name, social_network, firstLogin, lastLogin, status) VALUES ($1, $2, $3, $4, $5, $6)",
          [social_id, name, social_network, dateString, dateString, "active"]
        ).then((data) => res.send({ loggedIn: true }));
      }
    })
    .catch((error) => res.send(error));
};

module.exports = createUser;
