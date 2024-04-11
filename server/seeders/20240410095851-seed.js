"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "roles",
      [
        {
          id: 1,
          RoleName: "Admin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          RoleName: "Moderator",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3,
          RoleName: "User",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "users",
      [
        {
          username: "User 1",
          password: "password1",
          roleId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: "User 2",
          password: "password2",
          roleId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: "User 3",
          password: "password3",
          roleId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: "User 4",
          password: "password4",
          roleId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: "User 5",
          password: "password5",
          roleId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "posts",
      [
        {
          title: "Title 1",
          content: "content 1",
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Title 1",
          content: "content 2",
          userId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Title 1",
          content: "content 3",
          userId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Title 1",
          content: "content 4",
          userId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Title 1",
          content: "content 5",
          userId: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "comments",
      [
        {
          text: "Comment 1",
          userId: 1,
          postId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          text: "Comment 2",
          userId: 2,
          postId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          text: "Comment 3",
          userId: 3,
          postId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          text: "Comment 4",
          userId: 4,
          postId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          text: "Comment 5",
          userId: 5,
          postId: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("comments", null, {});
    await queryInterface.bulkDelete("posts", null, {});
    await queryInterface.bulkDelete("users", null, {});
  },
};
