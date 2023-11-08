const trycatchmiddleware = (trycatchhandler) => {
    return async (req, res, next) => {
      try {
        await trycatchhandler(req, res, next);
      } catch (error) {
       next(error);
       
      }
    };
  };
  
  export default trycatchmiddleware;
  