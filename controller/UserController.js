const UserModel=require("../model/UserModel");
const TaskAssignModel=require("../model/TaskModel");
const Excel=require("exceljs");

// Home
const Home=async(req, res)=>{
    res.render("home");
}

// Add User
const UserAdd=async(req, res)=>{
    res.render("adduser");
}

// Create Task
const TaskCreate=async(req, res)=>{
    const UserData=await UserModel.findAll();
    res.render("createtask",{UserData:UserData});
}

// Display
const Display=async(req, res)=>{ 
    const findData=await TaskAssignModel.findAll();
    res.render("display", {mydata:findData});
}

// Create User
const UserCreate = async (req, res) => {
  try {
    const { name, email, mobile } = req.body;

    if (!name || !email || !mobile) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }

    const newUser = await UserModel.create({ name, email, mobile });
    
    res.render("adduser",{
        alert:{
            type:"success",
            message:"User created successfully"
        }
    })
} catch (error) {
    console.error("Error creating user:", error);
  }
};

// Task Assign
const TaskAdd=async(req, res)=>{
    try {
    const {name,task,description,status}=req.body;
    const findUser=await UserModel.findOne({where:{name:name}})

    const TaskAssign=await TaskAssignModel.create({
            name:name,
            email:findUser.email,
            task:task,
            description:description,
            status:status
    })
        res.render("createtask")
    } catch (error) {
        console.error("Error creating user:", error);
    }
    
}   

// Download
const Download=async(req, res)=>{
var options = {
    filename: './streamed-workbook.xlsx',
    useStyles: true,
    useSharedStrings: true
};

const workbook = new Excel.Workbook();
  const sheet = workbook.addWorksheet('TaskAssignModel');
sheet.columns = [
    { header: 'Name', key: 'name', width: 10 },
    { header: 'Email', key: 'email', width: 32 }, 
    { header: 'Task', key: 'task', width: 10 },
    { header: 'Task Description', key: 'description', width: 20 },
    { header: 'Task Status', key: 'status', width: 10 }
];

const display=await TaskAssignModel.findAll();
display.forEach(Task => {sheet.addRow(Task);});

const sheet2 = workbook.addWorksheet('UserModel');
sheet2.columns = [
    { header: 'Name', key: 'name', width: 10 },
    { header: 'Email', key: 'email', width: 32 }, 
    { header: 'Mobile No.', key: 'mobile', width: 15 }, 
    ];

const displayUser=await UserModel.findAll();
displayUser.forEach(User => {sheet2.addRow(User);});

res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"); res.setHeader("Content-Disposition", "attachment; filename=" + "user_task_data.xlsx");

workbook.xlsx.write(res).then(() => res.end());
}

module.exports={
    Home,
    UserAdd,
    TaskCreate,
    Display,
    UserCreate,
    TaskAdd,
    Download
}