const catalyst = require('zcatalyst-sdk-node');

module.exports = (context, basicIO) => {
   
    const catalystApp = catalyst.initialize(context);
	    const num1 = basicIO.getArgument("num1");
        const num2 = basicIO.getArgument("num2");

    if (num1 && num2) {
        const sum = num1 + num2;
        basicIO.write(JSON.stringify({ sum }));
        context.close();
    } else {
        basicIO.write(JSON.stringify({ error: "Invalid request body structure" }));
        context.close();
    }
};
