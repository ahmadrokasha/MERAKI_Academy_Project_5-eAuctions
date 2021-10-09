const connection = require("../../db/db");

const createAuction = (req, res) => {
  const { starter_bid, start_date, end_date, bid_jump } = req.body;

  const newAuction = [starter_bid, start_date, end_date, bid_jump];
  const query = `INSERT INTO auctions (starter_bid, start_date, end_date,bid_jump) values (?,?,?,?)`;

  connection.query(query, newAuction, (err, result, fields) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: `Server Error`,
      });
    }
    console.log(result);
    res.status(201).json({
      success: true,
      message: `new auction created`,
      result: result,

      // bid: {
      //   bid_id:result
      // auction_id: result.insertId,
      // date: title,
      // user_id: details,
      // bid_value: image,

      //   },
    });
  });
};

const getAllAuctions = (req, res) => {
  const query = `SELECT * FROM auctions where is_deleted = 0`;
  connection.query(query, (err, result, fields) => {
    if (err) {
      console.log(err.message);
      return res.status(500).json({
        success: false,
        message: `Server Error`,
      });
    }
    // if (result.length===0) {
    //     return res.status(400).json({
    //       success: false,
    //       message: `there is no item added yet`,
    //     });
    //   }
    res.status(200).json({
      success: true,
      message: `all auctions`,
      result: result,
    });
  });
};

const getAuctionById = (req, res) => {
  const auction_id = req.params.auction_id;
  const query = `SELECT * FROM auctions where is_deleted = 0 AND auction_id = ${auction_id}`;
  connection.query(query, (err, result, fields) => {
    if (err) {
      console.log(err.message);
      return res.status(500).json({
        success: false,
        message: `Server Error`,
      });
    }
    if (result.length === 0) {
      return res.status(400).json({
        success: false,
        message: `the auction with id ${auction_id} is not exist`,
      });
    }
    res.status(200).json({
      success: true,
      message: `the auction with id ${auction_id}`,
      result: result,
    });
  });
};

const deleteAuctionById = (req, res) => {
  const { auction_id } = req.params;
  const query = `UPDATE auctions SET is_deleted =1 WHERE auction_id =${auction_id} AND is_deleted=0`;
  connection.query(query, (err, result, fields) => {
    if (!result.affectedRows) {
      return res.status(404).json({
        success: false,
        message: `auction with id ${auction_id} does not exist`,
      });
    }
    res.status(202).json({
      success: true,
      message: `Success Delete auction with id => ${auction_id}`,
    });
  });
};

module.exports = {
  createAuction,
  getAllAuctions,
  getAuctionById,
  deleteAuctionById,
};
