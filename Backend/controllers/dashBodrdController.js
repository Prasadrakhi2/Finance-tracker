const Income = require('../models/Income');
const Expense = require('../models/Expense');
const {isValidObjectId, Types} = require('mongoose');

//Dashbord Data
exports.getDashbordData = async(req,res) =>{
    try{
        const userId = req.user.id;
        const userObjectId = new Types.ObjectId(String(userId));

        //Fech total income & expense
        const totalIncome = await Income.aggregate([
            {$match: {userId:userObjectId}}, // Filter by userId
            {$group: {_id:null, total:{$sum:"$amount"}}},  // Sum the amounts
        ]);
        console.log("totalIncome",{totalIncome, userId:isValidObjectId(userId)})
        console.log('Total Income:', totalIncome);

        const totalExpense = await Expense.aggregate([ 
            {$match: {userId:userObjectId}},
            {$group: {_id:null, total:{$sum:"$amount"}}},
        ]);
        console.log("totlexpenses",{totalExpense, userId:isValidObjectId(userId)})

        // Get income transactions in last 60 days
        const last60DaysIncomeTransactions = await Income.find({
            userId,
            date:{$gte: new Date(Date.now() - 60*24*60*60*1000)},
        }).sort({date : -1});

        // Get total income for last 60 days
        const incomeLast60Days = last60DaysIncomeTransactions.reduce((sum, transaction)=> sum+transaction.amount,0);

        // get expense transactions in last 30 days last30DaysExpenseTransactions
        const last30DaysExpenseTransactions = await Expense.find({
            userId,
            date:{$gte: new Date(Date.now() - 60*24*60*60*1000)},
        }).sort({date : -1});
 
        // get total expenses for last 30 days
        const expensesLast30Days = last30DaysExpenseTransactions.reduce((sum,transaction)=> sum+transaction.amount,0);

        // fetch last 5 transactions (income + expenses)
        const lastTransactions = [
            ...(await Income.find({userId}).sort({date : -1}).limit(5)).map((txn)=>({
                ...txn.toObject(),
                type: "income",
            })),
            ...(await Expense.find({userId}).sort({date:-1}).limit(5)).map((txn)=>({
                ...txn.toObject(),
                type: "expense",
            })),
        ].sort((a,b)=>b.date - a.date) // sort latest first

 
        // final response
        res.json({
            
            totalBalance:
            (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),
            totalIncome: totalIncome[0]?.total || 0,
            totalExpense: totalExpense[0]?.total ||0,
            
            last30DaysExpenses: {
                total: expensesLast30Days,
                transactions: last30DaysExpenseTransactions,
            },
            last60DaysIncome:{
                total:incomeLast60Days,
                transactions: last60DaysIncomeTransactions,
            },
            recentTransactions: lastTransactions,
        });
        
    }catch(err){
        res.status(500).json({message:"server error", err});
    }
}