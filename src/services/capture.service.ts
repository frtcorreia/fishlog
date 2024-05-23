import { PrismaClient, Todo } from "@prisma/client";
import { CaptureDto, CreateCaptureDto, UpdateCaptureDto } from "../types";
import { BadRequestError, NotFoundError } from "../helpers/errors";

const prisma = new PrismaClient();

const createCapture = async (data: CreateCaptureDto) => {
  const location = await prisma.location.create({
    data: {
      latitude: data.location.latitude,
      longitude: data.location.longitude,
    },
  });

  const weather = await prisma.weather.create({
    data: {
      pressure: data.weather.pressure,
      temperature: data.weather.temperature,
      skyCoverage: data.weather.skyCoverage,
    },
  });

  const water = await prisma.water.create({
    data: {
      visibility: data.water.visibility,
      color: data.water.color,
    },
  });

  const bait = await prisma.bait.create({
    data: {
      bait: data.bait.bait,
      rod: data.bait.rod,
      technique: data.bait.technique,
    },
  });

  return prisma.capture.create({
    data: {
      weight: data?.weight,
      size: data?.size,
      photo: data?.photo,
      timestamp: data?.timestamp,
      locationId: location.id,
      weatherId: weather.id,
      waterId: water.id,
      baitId: bait.id,
      userId: data?.userId,
      description: data?.description,
    },
  });
};

const getCaptures = async (userId: number) => {
  const captures = await prisma.capture.findMany({
    where: { userId },
    include: {
      location: true,
      waterData: true,
      baitData: true,
      user: true,
      weatherData: true,
    },
  });
  const formattedCaptures = captures.map((capture) => ({
    id: capture.id,
    weight: capture.weight,
    size: capture.size,
    photo: capture.photo,
    timestamp: capture.timestamp,
    description: capture.description,
    user: {
      id: capture.user?.id,
      name: capture.user?.name,
      email: capture.user?.email,
    },
    location: {
      latitude: capture.location?.latitude,
      longitude: capture.location?.longitude,
    },
    weather: {
      pressure: capture.weatherData?.pressure,
      temperature: capture.weatherData?.temperature,
      skyCoverage: capture.weatherData?.skyCoverage,
    },
    water: {
      visibility: capture.waterData?.visibility,
      color: capture.waterData?.color,
    },
    bait: {
      bait: capture.baitData?.bait,
      rod: capture.baitData?.rod,
      technique: capture.baitData?.technique,
    },
  }));

  return formattedCaptures;
};

const getCaptureId = async (id: number, userId: number) => {
  if (!id) {
    throw new BadRequestError("ID is required to delete a capture");
  }
  const capture = await prisma.capture.findUnique({
    where: { id, userId },
    include: {
      location: true,
      waterData: true,
      baitData: true,
      user: true,
      weatherData: true,
    },
  });

  if (!capture) {
    throw new Error(`Capture with ID ${id} not found`);
  }

  const formattedCapture = {
    id: capture.id,
    weight: capture.weight,
    size: capture.size,
    photo: capture.photo,
    timestamp: capture.timestamp,
    description: capture.description,
    user: {
      id: capture.user?.id,
      name: capture.user?.name,
      email: capture.user?.email,
    },
    location: {
      latitude: capture.location?.latitude,
      longitude: capture.location?.longitude,
    },
    weather: {
      pressure: capture.weatherData?.pressure,
      temperature: capture.weatherData?.temperature,
      skyCoverage: capture.weatherData?.skyCoverage,
    },
    water: {
      visibility: capture.waterData?.visibility,
      color: capture.waterData?.color,
    },
    bait: {
      bait: capture.baitData?.bait,
      rod: capture.baitData?.rod,
      technique: capture.baitData?.technique,
    },
  };

  return formattedCapture;
};

const updateCapture = async (
  id: number,
  userId: number,
  data: CreateCaptureDto
) => {
  if (!id) {
    throw new BadRequestError("ID is required to delete a capture");
  }
  const capture = await prisma.capture.findUnique({
    where: { id, userId },
  });

  if (!capture) {
    throw new NotFoundError(`Capture with ID ${id} not found`);
  }
  const updatedCapture = await prisma.capture.update({
    where: { id, userId },
    data: {
      weight: data.weight,
      size: data.size,
      photo: data.photo,
      timestamp: data.timestamp,
      userId: data.userId,
      description: data.description,
    },
  });

  if (data.location) {
    await prisma.location.update({
      where: { id: updatedCapture.locationId },
      data: data.location,
    });
  }

  if (data.weather) {
    await prisma.weather.update({
      where: { id: updatedCapture.weatherId },
      data: data.weather,
    });
  }

  if (data.water) {
    await prisma.water.update({
      where: { id: updatedCapture.waterId },
      data: data.water,
    });
  }

  if (data.bait) {
    await prisma.bait.update({
      where: { id: updatedCapture.baitId },
      data: data.bait,
    });
  }

  return updatedCapture;
};

const deleteCapture = async (id: number, userId: number) => {
  if (!id) {
    throw new BadRequestError("ID is required to delete a capture");
  }
  const capture = await prisma.capture.findUnique({
    where: { id, userId },
  });

  if (!capture) {
    throw new NotFoundError(`Capture with ID ${id} not found`);
  }

  await prisma.capture.delete({ where: { id } });
  await prisma.bait.delete({ where: { id } });
  await prisma.location.delete({ where: { id } });
  await prisma.water.delete({ where: { id } });
  await prisma.weather.delete({ where: { id } });

  return { message: `Capture with ID ${id} successfully deleted` };
};

export {
  createCapture,
  getCaptures,
  getCaptureId,
  updateCapture,
  deleteCapture,
};
