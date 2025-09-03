const xlsx = require('xlsx')
const Expense = require("../models/Expense")

// add expenses source
exports.addExpense = async(req, res)=>{
    const userId = req.user.id;
    const {icon, category, amount, date} = req.body;
    try{
       //validation: check for missing fields
       if(!category || !amount || !date){
        return res.status(400).json({message: "All fields are required"})
       }

       const newExpense = new Expense({
        userId,
        icon,
        category,
        amount,
        date:new Date(date)
       });

       await newExpense.save();
       res.status(200).json(newExpense);
    }catch(err){
        res.status(500).json({message:"server error"});
    }
}

// get All Expences source
exports.getAllExpense = async(req, res)=>{
    const userId = req.user.id;

    try{
        const expense = await Expense.find({userId}).sort({date: -1});
        res.status(200).json(expense);
    }catch(err){
        res.status(500).json({message:"server error"});
    }
}

// delete expenses source
exports.deleteExpense = async(req, res)=>{
    // const userId = req.user.id;

    try{
        await Expense.findByIdAndDelete(req.params.id);
        res.json({message: "Income deleted successfully"});
    }
    catch(err){
        res.status(500).json({message: "server error"});
    }
}

// download expense source
exports.downloadExpenseExcel = async(req, res)=>{
    const userId = req.user.id;
    try {
        const expense = await Expense.find({userId}).sort({date:-1});

        //prepare dates for excel
        const data = expense.map((item)=>({
            Source : item.source,
            Amount : item.amount,
            Date : item.date
        }));

        const wb = xlsx.utils.book_new();  //create new excel workbook
        const ws = xlsx.utils.json_to_sheet(data); //convert data into excel sheet
        xlsx.utils.book_append_sheet(wb, ws, "Expense");
        xlsx.writeFile(wb, 'expence_details.xlsx');
        res.download('expence_details.xlsx');
    } catch (error) {
        res.status(500).json({message: "server error"})
    }
}
