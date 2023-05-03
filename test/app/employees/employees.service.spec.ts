import { EmployeesService } from "../../../src/app/employees/employees.service";
import { Test, TestingModule } from '@nestjs/testing';
import { MongoMock } from "../../mock/mongo.mock";
import { getModelToken } from "@nestjs/mongoose";
import { Types } from "mongoose";


describe('EmployeesService', () => {
  let employeesService: EmployeesService;
  let mongoMockService: MongoMock;
  const expectedEmployee = [
    {
      "_id": "64377164804731d4c15dee99",
      "name": "aaaa",
      "phone": "3005742140",
      "age": 25,
      "email": "ee",
      "roles": [
        new Types.ObjectId("643817b0987fb61c70e7c1a2")
      ]
    }]

  beforeEach(async () => {
    mongoMockService = new MongoMock();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmployeesService,
        {
          provide: getModelToken('Employees'),
          useValue: mongoMockService
        }
      ],
    }).compile();
    employeesService = module.get<EmployeesService>(EmployeesService);
  })

  it('EmployeeService - should be defined', () => {
    expect(employeesService).toBeDefined();
  });

  describe('getAll', () => {
    it('should return employees', async () => {
      mongoMockService.response = expectedEmployee;
      const resultGetAll = await employeesService.getAll();
      expect(resultGetAll).toEqual(expectedEmployee);
    })
  })

  describe('getEmployee', () => {
    it('should return employee', async () => {
      mongoMockService.response = expectedEmployee;
      const resultGetEmployee = await employeesService.getEmployee(expectedEmployee[0]._id);
      expect(resultGetEmployee).toEqual(expectedEmployee[0]);
    })
  })

  describe('createEmployee', () => {
    it('should return employee', async () => {
      mongoMockService.response = expectedEmployee;
      const resultGetEmployee = await employeesService.createEmployee(expectedEmployee[0]);
      expect(resultGetEmployee).toEqual(expectedEmployee[0]);
    })
  })

  describe('updateEmployee', () => {
    it('should return updated employee', async () => {
      mongoMockService.response = expectedEmployee;
      const resultGetEmployee = await employeesService.updateEmployee(expectedEmployee[0]._id, expectedEmployee[0]);
      expect(resultGetEmployee).toEqual(expectedEmployee[0]);
    })
  })

})