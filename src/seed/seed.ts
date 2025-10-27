import mongoose, { Model } from 'mongoose';
import {  ProjectDocument} from '../project/project.schema';

const MONGO_URI = 'mongodb://localhost/porject-management'; // replace this


import { TaskDocument } from 'src/task/task.schema';

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['active', 'completed'], default: 'active' },
}, { timestamps: true });


const TaskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, enum: ['todo', 'in-progress', 'done'], default: 'todo' },
    dueDate: { type: Date, required: true },
    projectId: { type: mongoose.Types.ObjectId, ref: 'Project', required: true },
    userId: { type: mongoose.Types.ObjectId, ref: 'User', required: false },
  },
  { timestamps: true } // adds createdAt & updatedAt
);

export default ProjectSchema;

const projects = [
  {
    _id: new mongoose.Types.ObjectId('68f9c3c0a408d6a13e911fa6'),
    title: 'Restaurant Website Redesign',
    description: "Revamp the restaurant's online presence with a new design and ordering system.",
    status: 'active',
    userId: '68f9c158a408d6a13e911f97',
  },
  {
    _id: new mongoose.Types.ObjectId('68f9cb5c8f49ac6b99daf760'),
    title: 'Mobile App Development',
    description: 'Develop a mobile app for food delivery with real-time order tracking.',
    status: 'completed',
    userId: '68f9c158a408d6a13e911f97',
  }
];

const tasks = [
  {
    title: 'Design homepage layout',
    description: 'Create a modern homepage UI using Figma.',
    status: 'in-progress',
    dueDate: new Date(),
    projectId: '68f9c3c0a408d6a13e911fa6',
  },
  {
    title: 'Integrate payment gateway',
    description: 'Add Razorpay integration to the checkout flow.',
    status: 'todo',
    dueDate: new Date(),
    projectId: '68f9c3c0a408d6a13e911fa6',
  },
  {
    title: 'Optimize images',
    description: 'Compress images for faster load times.',
    status: 'done',
    dueDate: new Date(),
    projectId: '68f9c3c0a408d6a13e911fa6',
  },
  {
    title: 'Set up authentication',
    description: 'Implement JWT-based authentication for app users.',
    status: 'done',
    dueDate: new Date(),
    projectId: '68f9cb5c8f49ac6b99daf760',
  },
  {
    title: 'Push notifications',
    description: 'Add Firebase push notifications for order updates.',
    status: 'in-progress',
    dueDate: new Date(),
    projectId: '68f9cb5c8f49ac6b99daf760',
  },
  {
    title: 'UI Testing',
    description: 'Test app flows on Android and iOS devices.',
    status: 'todo',
    dueDate: new Date(),
    projectId: '68f9cb5c8f49ac6b99daf760',
  },
];


async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');

    
const ProjectModel: Model<ProjectDocument> = mongoose.model<ProjectDocument>('Project', ProjectSchema);
const TaskModel: Model<TaskDocument> = mongoose.model<TaskDocument>('Task', TaskSchema);



    await ProjectModel.deleteMany({});
    await TaskModel.deleteMany({});

    await ProjectModel.insertMany(projects);
    await TaskModel.insertMany(tasks);

    console.log('Database seeded successfully!');
  } catch (err) {
    console.error('Error seeding data:', err);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

seed();
