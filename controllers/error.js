const log_and_send_error=(log_message,status,send_message)=>{
    console.error(log_message);
 //   res.status(status).send(send_message);
}

module.exports = {log_and_send_error};