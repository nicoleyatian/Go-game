'use strict';

// src/services/message/hooks/process.js
//
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/hooks/readme.html

module.exports = function(options) {
  return function(hook) {
    // The authenticated user
    const user = hook.params.user;
    // The actual message text
    const x = hook.data.x;
    const y = hook.data.y;

      

    // Override the original data
    hook.data = {
      x:x,
      y:y,
      position: x + '-'+y,
      // Set the user id
      userId: +user.id,
      // Add the current time via `getTime`
      createdAt: new Date().getTime()
    };
  };
};