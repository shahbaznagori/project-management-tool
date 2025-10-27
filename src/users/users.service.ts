import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { User, UserDocument } from './users.schema';


@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

    async signup(  
        username: string,
        email: string,
        hashedPassword: string,
    ):  Promise<UserDocument> {
    
    try{

        // Create and save the user
        const createdUser = new this.userModel({
        username,
        email,
        password: hashedPassword,
        });
          const savedUser = await createdUser.save();
          

        // const { password: _, ...result } = savedUser.toObject();
        return savedUser; // now type is safe for controller
        
    }catch(err){
        console.log(err)
        throw err;
    }
}

    async login(email: string, password: string): Promise<User> {
    try {
    // Check if user exists
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }catch(err){
    console.log(err);
    throw err;
  }
}


 async findByEmail(email: string): Promise<UserDocument | null> {
    try {
      const user = await this.userModel.findOne({ email }).exec();
      console.log("USERsss", user)
      if (!user) {
        return null;
      }
      return user;
    } catch (error) {
      console.log(`Error finding user by email: ${email}`, error);
      throw error; // re-throw so the caller can handle it
    }
  }
  
  async findById(id: string): Promise<User | null> {
    try {
      const user = await this.userModel.findById(id).exec();
      if (!user) {
        return null;
      }
      return user;
    } catch (error) {
      console.log(`Error finding user by ID: ${id}`, error);
      throw error; // re-throw so the caller can handle it
    }
  }

}
