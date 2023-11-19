import { Response } from "express";

const mockResponse = {} as Response
mockResponse.json = jest.fn()
mockResponse.status = jest.fn(() => mockResponse)

export default mockResponse