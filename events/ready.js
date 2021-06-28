module.exports = (client) => {
    console.log(`Ready as ${client.user.tag}`);
    client.user.setActivity("kate.rest | kate help", { type: "STREAMING", url: "https://kate.rest/"})
};