export const successResponse = (res, data, message = "done") => {
    res.status(200).json({
      message,
      data,
    });
  };
  
  export const errorResponse = (res, message = "error", status = 500) => {
    res.status(status).json({
      success: false,
      message,
    });
  };