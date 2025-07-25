import { stat } from "fs";
import db from "../db/db.js";

export const createReview = async (req, res) => {
  try {
    const {
      ratting,
      textReview,
      file_type,
      description,
      youtubeLink,
      reviewerId,
      movieId,
    } = req.body;
    const video = req?.files?.video?.[0];
    const audio = req?.files?.audio?.[0];
    if (!reviewerId) {
      return res.status(400).json({
        data: [],
        error: "ReviewerId illa",
        message: "Reviewer Id anupuinga",
        status: 0,
      });
    }
    if (!movieId) {
      return res.status(400).json({
        message: "Movie Id anupuinga",
        data: [],
        error: "Moive Id illa",
        status: 0,
      });
    }

    let fields = [];
    let value = [];

    if (movieId) {
      fields.push("movie_id ");
      value.push(movieId);
    }
    if (reviewerId) {
      fields.push("reviewer_id ");
      value.push(reviewerId);
    }
    if (file_type) {
      fields.push("file_type ");
      value.push(file_type);
    }
    if (ratting) {
      fields.push("ratting ");
      value.push(ratting);
    }
    if (textReview) {
      fields.push("text_review ");
      value.push(textReview);
    }
    if (description) {
      fields.push("description ");
      value.push(description);
    }
    if (video) {
      fields.push("video_path");
      value.push(video.filename);
    }
    if (audio) {
      fields.push("audio_path");
      value.push(audio.filename);
    }

    if (youtubeLink) {
      fields.push("youtube_link");
      value.push(youtubeLink);
    }

    const sql = `INSERT INTO movie_reviews (${fields.join(
      ", "
    )}) VALUES (${fields.map(() => "?").join(", ")})`;
    let [create] = await db.query(sql, value);
    let result = create.affectedRows ? 1 : 0;

    return res.status(200).json({
      message: "Added",
      error: [],
      data: "The review is created",
      status: result,
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message,
      data: [],
      message: error,
      status: 0,
    });
  }
};

export const Bookmark = async (req, res) => {
  try {
    const { userId, movieId } = req.body;

    if (!userId) {
      return res.status(400).json({
        message: "User Id anupala",
        data: [],
        status: 0,
        error: "User Id pass aagala fend la irruthu",
      });
    }

    if (!movieId) {
      return res.status(400).json({
        message: "Movie Id anupala",
        data: [],
        status: 0,
        error: "Movie Id pass aagala fend la irruthu",
      });
    }

    const [existingBookmark] = await db.query(
      "SELECT * FROM watch_list WHERE user_id = ? AND movie_id = ?",
      [userId, movieId]
    );

    if (existingBookmark.length === 0) {
      const [create] = await db.query(
        "INSERT INTO watch_list (user_id, movie_id) VALUES (?, ?)",
        [userId, movieId]
      );
      const result = create.affectedRows ? 1 : 0;

      return res.status(200).json({
        message: "The movie is added to watch list",
        status: result,
        error: [],
        data: [],
      });
    } else {
      const [deletes] = await db.query("DELETE FROM watch_list WHERE id = ?", [
        existingBookmark[0].id,
      ]);
      const result = deletes.affectedRows ? 1 : 0;

      return res.status(200).json({
        message: "The movie is removed from watch list",
        status: result,
        error: [],
        data: [],
      });
    }
  } catch (error) {
    return res.status(400).json({
      message: "There is an error in toggling the watch list",
      error: error.message,
      status: 0,
      data: [],
    });
  }
};

// export const follow = async (req, res) => {
//   try {
//     const { follower_id, following_id } = req.body;
//     if (!follower_id) {
//       return res.status(400).json({
//         messae: "The follower id is not passed",
//         status: 0,
//         error: "Follower id aah pass pannuinga",
//         data: [],
//       });
//     }
//     if (!following_id) {
//       return res.status(400).json({
//         messae: "The following id is not passed",
//         status: 0,
//         error: "Following id aah pass pannuinga",
//         data: [],
//       });
//     }
//     const [followed] = await db.query(
//       "SELECT * FROM follow WHERE follower_id = ? AND following_id  = ?",
//       [follower_id, following_id]
//     );
//     if (followed.length === 0) {
//       let [create] = await db.query(
//         "INSERT INTO follow(follower_id,following_id) VALUES (?,?)",
//         [follower_id, following_id]
//       );
//       let result = create.affectedRows ? 1 : 0;
//       return res.status(200).json({
//         message: "You have followed the user",
//         status: result,
//         data: "Neeinga follow pannitinga",
//         error: [],
//       });
//     } else {
//       let [deletes] = await db.query(
//         "DELETE FROM follow WHERE id  = ?",
//         followed?.[0].id
//       );
//       let result = deletes.affectedRows ? 1 : 0;
//       return res.status(200).json({
//         message: "You have unfollowed the user",
//         error: [],
//         data: "Neeinga unfollow pannitinga",
//         status: result,
//       });
//     }
//   } catch (error) {
//     return res.status(400).json({
//       message: error,
//       error: error.message,
//       data: [],
//       status: 0,
//     });
//   }
// };

export const follow = async (req, res) => {
  try {
    const { follower_id, following_id } = req.body;

    if (!follower_id || !following_id) {
      return res.status(400).json({
        message: "Missing follower_id or following_id",
        error: "follower_id & following_id required",
        data: [],
        status: 0,
      });
    }

    const [exists] = await db.query(
      "SELECT * FROM follow WHERE follower_id = ? AND following_id = ?",
      [follower_id, following_id]
    );

    if (exists.length === 0) {
      const [create] = await db.query(
        "INSERT INTO follow(follower_id, following_id) VALUES (?, ?)",
        [follower_id, following_id]
      );

      const [notify] = await db.query(
        `INSERT INTO notification(sender_id, receiver_id, message, notification_type)
         VALUES (?, ?, 'started following you', 'follow')`,
        [follower_id, following_id]
      );

      return res.status(200).json({
        message: "You have followed the user",
        status: 1,
        data: "Neeinga follow pannitinga",
        error: [],
      });
    } else {
      const [unfollow] = await db.query("DELETE FROM follow WHERE id = ?", [
        exists[0].id,
      ]);

      await db.query(
        `DELETE FROM notification 
         WHERE sender_id = ? AND receiver_id = ? AND notification_type = 'follow'`,
        [follower_id, following_id]
      );

      return res.status(200).json({
        message: "You have unfollowed the user",
        status: 1,
        data: "Neeinga unfollow pannitinga",
        error: [],
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
      data: [],
      status: 0,
    });
  }
};

export const followersList = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        message: "User ID not provided",
        error: "User ID aah pass pannuinga",
        data: [],
        status: 0,
      });
    }

    const [followers] = await db.query(
      `
      SELECT 
        u.id AS user_id,
        u.name,
        u.email,
        u.avathar
      FROM follow f
      LEFT JOIN user u ON f.follower_id = u.id
      WHERE f.following_id = ? AND u.status = 0 AND u.s_delete = 0
    `,
      [id]
    );

    return res.status(200).json({
      message: "Followers fetched successfully",
      data: followers,
      error: [],
      status: 1,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
      data: [],
      status: 0,
    });
  }
};

export const followingList = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        message: "User ID not provided",
        error: "User ID aah pass pannuinga",
        data: [],
        status: 0,
      });
    }

    const [following] = await db.query(
      `
      SELECT 
        u.id AS user_id,
        u.name,
        u.email,
        u.avathar
      FROM follow f
      INNER JOIN user u ON f.following_id = u.id
      WHERE f.follower_id = ? AND u.status = 0 AND u.s_delete = 0
      `,
      [id]
    );

    return res.status(200).json({
      message: "Following list fetched successfully",
      data: following,
      error: [],
      status: 1,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
      data: [],
      status: 0,
    });
  }
};

// export const like = async (req, res) => {
//   try {
//     const { review_id, reviewer_id, user_id, command_id, commender_id } = req.body;

//     if (review_id) {
//       const [add] = await db.query(
//         "INSERT INTO like_table (review_id, user_id, like_type) VALUES (?, ?, 1)",
//         [review_id, user_id]
//       );

//       const [notify] = await db.query(
//         "INSERT INTO notification (sender_id, receiver_id, message, notification_type) VALUES (?, ?, 'liked your review', 'postLike')",
//         [user_id, reviewer_id]
//       );

//       const result = add.affectedRows ? 1 : 0;
//       const notifyresult = notify.affectedRows ? 1 : 0;

//       return res.status(200).json({
//         message: "You have liked the review",
//         status: result,
//         data: [],
//         error: [],
//         notifyresult
//       });
//     }

//     if (command_id) {
//       const [add] = await db.query(
//         "INSERT INTO like_table (command_id, user_id, like_type) VALUES (?, ?, 2)",
//         [command_id, user_id]
//       );

//       const [notify] = await db.query(
//         "INSERT INTO notification (sender_id, receiver_id, message, notification_type) VALUES (?, ?, 'liked your comment', 'commandLike')",
//         [user_id, commender_id]
//       );

//       const result = add.affectedRows ? 1 : 0;
//       const notifyresult = notify.affectedRows ? 1 : 0;

//       return res.status(200).json({
//         message: "The comment has been liked",
//         status: result,
//         data: [],
//         error: [],
//         notifyresult
//       });
//     }

//     return res.status(400).json({
//       message: "Missing review_id or command_id",
//       status: 0,
//       data: [],
//       error: ["Invalid input"]
//     });

//   } catch (error) {
//     console.error("Like error:", error);
//     return res.status(500).json({
//       message: "Internal server error",
//       status: 0,
//       data: [],
//       error: [error.message]
//     });
//   }
// };

export const like = async (req, res) => {
  try {
    const { review_id, reviewer_id, user_id, command_id, commender_id } =
      req.body;

    if (review_id) {
      const [exists] = await db.query(
        "SELECT * FROM like_table WHERE review_id = ? AND user_id = ? AND like_type = 1",
        [review_id, user_id]
      );

      if (exists.length === 0) {
        const [add] = await db.query(
          "INSERT INTO like_table (review_id, user_id, like_type) VALUES (?, ?, 1)",
          [review_id, user_id]
        );

        const [notify] = await db.query(
          `INSERT INTO notification (sender_id, receiver_id, message, notification_type)
           VALUES (?, ?, 'liked your review', 'postLike')`,
          [user_id, reviewer_id]
        );

        return res.status(200).json({
          message: "You have liked the review",
          status: 1,
          data: [],
          error: [],
        });
      } else {
        await db.query("DELETE FROM like_table WHERE id = ?", [exists[0].id]);

        await db.query(
          "DELETE FROM notification WHERE sender_id = ? AND receiver_id = ? AND notification_type = 'postLike'",
          [user_id, reviewer_id]
        );

        return res.status(200).json({
          message: "You have unliked the review",
          status: 1,
          data: [],
          error: [],
        });
      }
    }

    if (command_id) {
      const [exists] = await db.query(
        "SELECT * FROM like_table WHERE command_id = ? AND user_id = ? AND like_type = 2",
        [command_id, user_id]
      );

      if (exists.length === 0) {
        const [add] = await db.query(
          "INSERT INTO like_table (command_id, user_id, like_type) VALUES (?, ?, 2)",
          [command_id, user_id]
        );

        const [notify] = await db.query(
          `INSERT INTO notification (sender_id, receiver_id, message, notification_type)
           VALUES (?, ?, 'liked your comment', 'commandLike')`,
          [user_id, commender_id]
        );

        return res.status(200).json({
          message: "The comment has been liked",
          status: 1,
          data: [],
          error: [],
        });
      } else {
        await db.query("DELETE FROM like_table WHERE id = ?", [exists[0].id]);

        await db.query(
          "DELETE FROM notification WHERE sender_id = ? AND receiver_id = ? AND notification_type = 'commandLike'",
          [user_id, commender_id]
        );

        return res.status(200).json({
          message: "You have unliked the comment",
          status: 1,
          data: [],
          error: [],
        });
      }
    }

    return res.status(400).json({
      message: "Missing review_id or command_id",
      status: 0,
      data: [],
      error: ["Invalid input"],
    });
  } catch (error) {
    console.error("Like error:", error);
    return res.status(500).json({
      message: "Internal server error",
      status: 0,
      data: [],
      error: [error.message],
    });
  }
};

export const reportUser = async (req, res) => {
  try {
    const { review_id, repoter_id, report_list_id, reason } = req.body;
    const reportList = report_list_id || null;
    const reasons = reason || null;
    if (!review_id) {
      return res.status(400).json({
        message: "Reviewer Id illa",
        data: [],
        error: "reviwer id is missing",
        status: 0,
      });
    }
    if (!repoter_id) {
      return res.status(400).json({
        message: "The Repoter id is missing",
        data: [],
        status: 0,
        error: "The repoter id is missing",
      });
    }
    const [create] = await db.query(
      "INSERT INTO report(review_id,repoter_id,report_list_id,reason) VALUES (?,?,?,?)",
      [review_id, repoter_id, reportList, reason]
    );
    let result = create.affectedRows ? 1 : 0;
    return res.status(200).json({
      message: "Sucesfully Repoted the user",
      data: [],
      status: result,
      error: [],
    });
  } catch (error) {
    return res.status(400).json({
      messae: error,
      error: error.message,
      status: 0,
      data: [],
    });
  }
};

export const createCommand = async (req, res) => {
  try {
    const { reviewId, userId, reciverId, comment, replayCommandId } = req.body;
    if (!reviewId || !userId || !replayCommandId || !comment) {
      return res.status(400).json({
        error: "All fields are required",
        message: "Ella fileds ku data varala",
        data: [],
        status: 0,
      });
    }
    let [create] = await db.query(
      "INSERT INTO comments (review_id,user_id,comment,replayed_comment_id) VALUES (?,?,?,?)",
      [reviewId, userId, comment, replayCommandId]
    );
    let result = create.affectedRows ? 1 : 0;

    const [notify] = await db.query(
      "INSERT INTO notification(sender_id,receiver_id,message,notification_type,clear_id) VALUES(?,?,?,'commented',?)",
      [userId, reciverId, comment, create?.insertId]
    );
    let notifyresult = notify.affectedRows ? 1 : 0;
    let notifymessage = notifyresult
      ? "The Notification Added"
      : "The Notification is Not added";
    return res.status(200).json({
      data: "The Command has added",
      error: [],
      message: "Command added",
      status: result,
      notifyresult: notifyresult,
      notifymessage: notifymessage,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
      error: [error.message],
      data: [],
      status: 0,
    });
  }
};

export const editCommand = async (req, res) => {
  try {
    const { id } = req.params;
    const { comment } = req.body;
    if (!id) {
      return res.status(400).json({
        message: "Command ooda Id aah pass pannuinga",
        data: [],
        error: "Command Id is missing",
        status: 0,
      });
    }
    let [update] = await db.query(
      "UPDATE  comments SET comment = ? WHERE id  = ?",
      [comment, id]
    );
    let [updatenotify] = await db.query(
      "UPDATE  notification SET message = ? WHERE clear_id  = ?",
      [comment, id]
    );
    let result = update.affectedRows ? 1 : 0;
    return res.status(200).json({
      messae: "The command is updated",
      status: result,
      error: [],
      data: "The Value is changed",
    });
  } catch (error) {
    return res.status(400).json({
      messae: error,
      error: [error.message],
      data: [],
      status: 0,
    });
  }
};

// export const deleteCommand = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const [getSubcommandId] = await db.query(
//       "SELECT id FROM comments WHERE replayed_comment_id =? ",
//       [id]
//     );
//     const idsToDelete = [id, ...getSubcommandId.map((row) => row.id)];

//     const [deletes] = await db.query(
//       `DELETE FROM comments
//       WHERE id = ? OR replayed_comment_id = ?`,
//       [id, id]
//     );
//     let result = deletes.affectedRows ? 1 : 0;

//     const [deletesnotify] = await db.query(
//       `DELETE FROM notification WHERE clear_id IN (${idsToDelete
//         .map(() => "?")
//         .join(",")})`,
//       idsToDelete
//     );
//     let notifyresult = deletesnotify.affectedRows ? 1 : 0;

//     return res.status(200).json({
//       message: "The Commands where Deleted",
//       data: "The Command is deleted",
//       error: [],
//       status: result,
//     });
//   } catch (error) {
//     return res.status(400).json({
//       messae: error,
//       error: [error.messae],
//       data: [],
//       status: 0,
//     });
//   }
// };

export const deleteCommand = async (req, res) => {
  try {
    const { id } = req.params;

     const [subComments] = await db.query(
      "SELECT id FROM comments WHERE replayed_comment_id = ?",
      [id]
    );

     const idsToDelete = [id, ...subComments.map((row) => row.id)];

     const [deletes] = await db.query(
      `DELETE FROM comments WHERE id IN (${idsToDelete
        .map(() => "?")
        .join(",")})`,
      idsToDelete
    );

     const [deletesnotify] = await db.query(
      `DELETE FROM notification WHERE clear_id IN (${idsToDelete
        .map(() => "?")
        .join(",")})`,
      idsToDelete
    );

    const result = deletes.affectedRows ? 1 : 0;

    return res.status(200).json({
      message: "The comment and replies were deleted",
      data: "Deleted",
      error: [],
      status: result,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      error: [error.message],
      data: [],
      status: 0,
    });
  }
};

// export const getAllCommand = async (req, res) => {
//   try {
//     const { id,userId } = req.body;
    
//     const [data] = await db.query(
//       `
//       SELECT 
//         c.id AS comment_id,
//         c.comment,
//         c.created_at,
//         c.user_id,
//         c.replayed_comment_id, -- ✅ reply reference
//         u.name AS commenter_name,
//         u.avathar,
//         CASE 
//             WHEN lk.user_id IS NOT NULL THEN true 
//             ELSE false 
//           END AS is_favorite,
//         COUNT(l.id) AS like_count -- ✅ total likes for this comment
//       FROM comments AS c
//       LEFT JOIN user AS u ON c.user_id = u.id
//       LEFT JOIN like_table AS l ON c.id = l.command_id AND l.like_type = 2
//       LEFT JOIN like_table AS lk ON c.user_id = l.user_id AND l.like_type = 2 AND lk.user_id = ?
//       WHERE c.review_id = ? AND c.status = 0
//       GROUP BY c.id
//       ORDER BY c.created_at DESC
//     `,
//       [id]
//     );

//     const result = data.length ? 1 : 0;

//     return res.status(200).json({
//       message: "Comments fetched successfully",
//       status: result,
//       error: [],
//       data,
//     });
//   } catch (error) {
//     return res.status(400).json({
//       message: "Something went wrong",
//       status: 0,
//       error: error.message,
//       data: [],
//     });
//   }
// };

export const getAllCommand = async (req, res) => {
  try {
    const { id: reviewId, userId } = req.body;

    const [data] = await db.query(
      `
      SELECT 
        c.id AS comment_id,
        c.comment,
        c.created_at,
        c.user_id,
        c.replayed_comment_id,
        u.name AS commenter_name,
        u.avathar,
        COUNT(l.id) AS like_count,
        -- Check if this specific comment is liked by current user
        CASE 
          WHEN EXISTS (
            SELECT 1 
            FROM like_table 
            WHERE command_id = c.id AND user_id = ? AND like_type = 2
          ) THEN true
          ELSE false
        END AS is_favorite
      FROM comments AS c
      LEFT JOIN user AS u ON c.user_id = u.id
      LEFT JOIN like_table AS l ON c.id = l.command_id AND l.like_type = 2
      WHERE c.review_id = ? AND c.status = 0
      GROUP BY 
        c.id, c.comment, c.created_at, c.user_id, c.replayed_comment_id,
        u.name, u.avathar
      ORDER BY c.created_at DESC
      `,
      [userId, reviewId] // Correct parameter order
    );

    const result = data.length ? 1 : 0;

    return res.status(200).json({
      message: "Comments fetched successfully",
      status: result,
      error: [],
      data,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Something went wrong",
      status: 0,
      error: error.message,
      data: [],
    });
  }
};
