import { User }             from "src/users/entities/user.entity";
import { CreateUserDto }    from "src/users/dto/create-user.dto";
import { Roles }            from "../enums/roles.enum";
import { Injectable }       from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository }       from "typeorm";
import * as bcrypt          from 'bcrypt';


@Injectable()
export class UsersSeed {
  constructor(
    @InjectRepository (User) private readonly usersRepository: Repository<User>
  ) {}

  async seed() {
    const users: CreateUserDto[] = [
      { email: 'player1@example.com', name: 'Player One', password: 'password123', role: Roles.PLAYER },
      { email: 'player2@example.com', name: 'Player Two', password: 'password123', role: Roles.PLAYER },
      { email: 'player3@example.com', name: 'Player Three', password: 'password123', role: Roles.PLAYER },
      { email: 'player4@example.com', name: 'Player Four', password: 'password123', role: Roles.PLAYER },
      { email: 'player5@example.com', name: 'Player Five', password: 'password123', role: Roles.PLAYER },
      { email: 'player6@example.com', name: 'Player Six', password: 'password123', role: Roles.PLAYER },
      { email: 'player7@example.com', name: 'Player Seven', password: 'password123', role: Roles.PLAYER },
      { email: 'player8@example.com', name: 'Player Eight', password: 'password123', role: Roles.PLAYER },
      { email: 'player9@example.com', name: 'Player Nine', password: 'password123', role: Roles.PLAYER },
      { email: 'player10@example.com', name: 'Player Ten', password: 'password123', role: Roles.PLAYER },
      { email: 'player11@example.com', name: 'Player Eleven', password: 'password123', role: Roles.PLAYER },
      { email: 'player12@example.com', name: 'Player Twelve', password: 'password123', role: Roles.PLAYER },
      { email: 'player13@example.com', name: 'Player Thirteen', password: 'password123', role: Roles.PLAYER },
      { email: 'player14@example.com', name: 'Player Fourteen', password: 'password123', role: Roles.PLAYER },
      { email: 'player15@example.com', name: 'Player Fifteen', password: 'password123', role: Roles.PLAYER },
      { email: 'player16@example.com', name: 'Player Sixteen', password: 'password123', role: Roles.PLAYER },
      { email: 'player17@example.com', name: 'Player Seventeen', password: 'password123', role: Roles.PLAYER },
      { email: 'player18@example.com', name: 'Player Eighteen', password: 'password123', role: Roles.PLAYER },
      { email: 'admin1@admin.com', name: 'Admin One', password: 'password123', role: Roles.ADMIN },
    ];
    console.log('Users seed');
    await Promise.all(users.map(async (user) => {
      const userExists = await this.usersRepository.findOne({ where: { email: user.email } });
      if(userExists) return;
      const hashedPassword = await bcrypt.hash(user.password, 10);
      user.password = hashedPassword;
      const newUser = this.usersRepository.create(user);
      await this.usersRepository.save(newUser);
    }));
  }
}