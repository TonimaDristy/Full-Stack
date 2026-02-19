import { Test, TestingModule } from '@nestjs/testing';
import { StudentController } from './student.controller';

describe('StudentController', () => {
  let controller: StudentController;



    controller = module.get<StudentController>(StudentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
