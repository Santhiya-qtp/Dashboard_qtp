import React from "react";
import profile_img from "../assets/profile_img.png";
import pro_img from "../assets/pro_img.png";
import post_img from "../assets/post_2.png";
import like from "../assets/like_icon.png";
import img1 from "../assets/img.avif";
import img2 from "../assets/img1.avif";
import img3 from "../assets/img2.avif";
import comment_icon from "../assets/comment_icon.svg";
import share_icon from "../assets/share_icon.svg";
const FeedSection = () => {
  const post_datas = [
    {
      profilePic: profile_img,
      name: "John Doe",
      postedTime: "2 hours ago",
      likeCount: 120,
      commentCount: 45,
      shareCount: 10,
      postContent: "This is a sample post content.",
      postImage: post_img,
      caption: "This is a caption for the post.",
      comments: [
        { user: "Jane Smith", comment: "Great post!" },
        { user: "Sam Wilson", comment: "Nice one, John!" },
        { user: "Lisa Ray", comment: "I love this!" },
      ],
    },
    {
      profilePic: profile_img,
      name: "John Doe",
      postedTime: "2 hours ago",
      likeCount: 120,
      commentCount: 45,
      shareCount: 10,
      postContent: "This is a sample post content.",
      postImage: img1,
      caption: "This is a caption for the post.",
      comments: [
        { user: "Jane Smith", comment: "Great post!" },
        { user: "Sam Wilson", comment: "Nice one, John!" },
        { user: "Lisa Ray", comment: "I love this!" },
      ],
    },
    {
      profilePic: profile_img,
      name: "John Doe",
      postedTime: "2 hours ago",
      likeCount: 120,
      commentCount: 45,
      shareCount: 10,
      postContent: "This is a sample post content.",
      postImage: img2,
      caption: "This is a caption for the post.",
      comments: [
        { user: "Jane Smith", comment: "Great post!" },
        { user: "Sam Wilson", comment: "Nice one, John!" },
        { user: "Lisa Ray", comment: "I love this!" },
      ],
    },
    {
      profilePic: profile_img,
      name: "John Doe",
      postedTime: "2 hours ago",
      likeCount: 120,
      commentCount: 45,
      shareCount: 10,
      postContent: "This is a sample post content.",
      postImage: img3,
      caption: "This is a caption for the post.",
      comments: [
        { user: "Jane Smith", comment: "Great post!" },
        { user: "Sam Wilson", comment: "Nice one, John!" },
        { user: "Lisa Ray", comment: "I love this!" },
      ],
    },
  ];
  return (
    <>
      <div className="main-container col-span-6 rounded-lg mt-4 h-[75vh]  overflow-auto hide-scrollbar">
        <div className="header sticky top-0 flex items-center gap-3 border p-2 rounded-lg bg-[#FCFCFC] ">
          <img src={profile_img} alt="" />
          <div className="whats-in-mind-section border rounded-lg p-2 bg-white w-[100%]">
            <p>What’s on your mind ?</p>
          </div>
        </div>
        <div className="feeds-container space-y-2 mt-4">
          {post_datas.map((item) => {
            return (
              <div className="card border rounded-lg ">
                <div className="header p-2 flex items-center justify-between">
                  <div className="profile_section flex items-center gap-3">
                    <img src={item.profilePic} className="w-[40px]" />
                    <h1>Zara</h1>
                  </div>
                  <p className="text-sm">{item.postedTime}</p>
                </div>
                <div className="post_content">
                  <img
                    src={item.postImage}
                    className="w-[100%] h-[200px]  object-cover"
                  />
                </div>
                <div className="like-section mt-4 flex items-center justify-between px-3 border-bottom pb-2">
                  <div className="first-container flex gap-6">
                    <div className="box-1 w-fit flex gap-2">
                      <img src={like} className="w-[20px] h-[20px]" />
                      <p>{item.likeCount}</p>
                    </div>
                    <div className="box-2 w-fit flex gap-2">
                      <img src={comment_icon} className="w-[20px] h-[20px]" />
                      <p>{item.commentCount}</p>
                    </div>
                    <div className="box-3 w-fit flex gap-2">
                      <img src={share_icon} className="w-[20px] h-[20px]" />
                      <p>{item.shareCount}</p>
                    </div>
                  </div>
                  <div className="second-container">
                    <button className="bg-blue-600 text-white font-medium px-4 py-2 text-lg rounded-lg">
                      Acknowledge
                    </button>
                  </div>
                </div>
                <div className="caption-section p-2">
                  <h1 className="text-md text-gray-600">{item.caption}...</h1>
                </div>
                <div className="footer-section pl-2 pb-2">
                  <h1>View all {item.commentCount} comments</h1>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default FeedSection;
