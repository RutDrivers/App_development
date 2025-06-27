function success(res, data) {
    return res.status(200).json({ success: true, data });
  }
  
  function error(res, message, code = 500) {
    return res.status(code).json({ success: false, message });
  }
  
  module.exports = { success, error };
  