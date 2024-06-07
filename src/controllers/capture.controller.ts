import { Request, Response } from "express";
import { PrismaClientValidationError } from "@prisma/client/runtime/library";
import { Prisma } from "@prisma/client";
import prisma from "../prismaClient";

const addCapture = async (req: Request, res: Response) => {
  const {
    weight,
    size,
    imageUrl,
    date,
    time,
    location,
    weather,
    water,
    bait,
    description,
    userId,
  } = req.body;
  try {
    const locationRes = await prisma.location.create({
      data: {
        latitude: location.latitude,
        longitude: location.longitude,
      },
    });

    const weatherRes = await prisma.weather.create({
      data: {
        pressure: weather.pressure,
        temperature: weather.temperature,
        skyCoverage: weather.skyCoverage,
      },
    });

    const waterRes = await prisma.water.create({
      data: {
        visibility: water.visibility,
        color: water.color,
      },
    });

    const baitRes = await prisma.bait.create({
      data: {
        bait: bait.bait,
        rod: bait.rod,
        technique: bait.technique,
      },
    });

    const capture = await prisma.capture.create({
      data: {
        weight,
        size,
        photo: imageUrl ? imageUrl : null,
        date,
        time,
        locationId: locationRes.id,
        weatherId: weatherRes.id,
        waterId: waterRes.id,
        baitId: baitRes.id,
        userId,
        description,
      },
    });

    res.status(200).json(capture);
  } catch (e) {
    if (e instanceof PrismaClientValidationError) {
      console.error("Erro de validação:", e.message);
    } else {
      console.error("Outro erro:", e);
    }
    res.status(400).json("error");
  }
};

const getAllCaptures = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;
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
      date: capture?.date,
      time: capture?.time,
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
    res.status(200).json(formattedCaptures);
  } catch (e) {
    res.status(400).json("error");
  }
};

const getCapturesById = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ error: "ID is required to get a capture" });
  }
  try {
    const { userId } = req.body;
    const capture = await prisma.capture.findUnique({
      where: { id: Number(id), userId },
      include: {
        location: true,
        waterData: true,
        baitData: true,
        user: true,
        weatherData: true,
      },
    });

    if (!capture) {
      return res.status(400).json({ error: `Capture with ID ${id} not found` });
    }

    const formattedCapture = {
      id: capture.id,
      weight: capture.weight,
      size: capture.size,
      photo: capture.photo,
      date: capture?.date,
      time: capture?.time,
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

    res.status(200).json(formattedCapture);
  } catch (e) {
    res.status(400).json("error");
  }
};

const updateCaptureById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { weight, size, imageUrl, date, time, description } = req.body;

  try {
    if (!id) {
      return res
        .status(400)
        .json({ error: "ID is required to update a capture" });
    }
    const capture = await prisma.capture.findUnique({
      where: { id: Number(id) },
    });

    if (!capture) {
      return res.status(400).json({ error: `Capture with ID ${id} not found` });
    }
    const updatedCapture = await prisma.capture.update({
      where: { id: Number(id) },
      data: {
        weight: weight,
        size: size,
        photo: imageUrl ? imageUrl : null,
        date: date,
        time: time,
        description: description,
      },
      include: {
        location: true,
        weatherData: true,
        waterData: true,
        baitData: true,
        user: true,
      },
    });

    let location = updatedCapture.location;
    if (location) {
      location = await prisma.location.update({
        where: { id: updatedCapture.locationId },
        data: location,
      });
    }

    let weather = updatedCapture.weatherData;
    if (weather) {
      weather = await prisma.weather.update({
        where: { id: updatedCapture.weatherId },
        data: weather,
      });
    }

    let water = updatedCapture.waterData;
    if (water) {
      water = await prisma.water.update({
        where: { id: updatedCapture.waterId },
        data: water,
      });
    }

    let bait = updatedCapture.baitData;
    if (bait) {
      bait = await prisma.bait.update({
        where: { id: updatedCapture.baitId },
        data: bait,
      });
    }
    const formattedCapture = {
      id: updatedCapture.id,
      weight: updatedCapture.weight,
      size: updatedCapture.size,
      photo: updatedCapture.photo,
      date: updatedCapture?.date,
      time: updatedCapture?.time,
      description: updatedCapture.description,
      user: {
        id: updatedCapture.user?.id,
        name: updatedCapture.user?.name,
        email: updatedCapture.user?.email,
      },
      location: {
        latitude: location?.latitude,
        longitude: location?.longitude,
      },
      weather: {
        pressure: weather?.pressure,
        temperature: weather?.temperature,
        skyCoverage: weather?.skyCoverage,
      },
      water: {
        visibility: water?.visibility,
        color: water?.color,
      },
      bait: {
        bait: bait?.bait,
        rod: bait?.rod,
        technique: bait?.technique,
      },
    };

    res.status(200).json(formattedCapture);
  } catch (e) {
    if (e instanceof Prisma.PrismaClientValidationError) {
      console.error("Erro de validação:", e.message);
      res.status(400).json({ error: "Erro de validação", details: e.message });
    } else if (e instanceof Prisma.PrismaClientKnownRequestError) {
      console.error("Erro conhecido do Prisma:", e.message);
      res.status(400).json({ error: "Erro do Prisma", details: e.message });
    } else {
      console.error("Outro erro:", e);
      res.status(500).json({ error: "Erro interno do servidor", details: e });
    }
  }
};

const deleteCaptureById = async (req: any, res: any) => {
  const id = parseInt(req.params.id, 10);
  try {
    if (!id) {
      return res
        .status(400)
        .json({ error: "ID is required to update a capture" });
    }

    const capture = await prisma.capture.findUnique({
      where: { id },
    });

    if (!capture) {
      return res.status(400).json({ error: `Capture with ID ${id} not found` });
    }

    await prisma.capture.delete({ where: { id } });
    await prisma.bait.delete({ where: { id } });
    await prisma.location.delete({ where: { id } });
    await prisma.water.delete({ where: { id } });
    await prisma.weather.delete({ where: { id } });

    res
      .status(200)
      .json({ message: `Capture with ID ${id} successfully deleted` });
  } catch (e) {
    res.status(400).json("error");
  }
};

export {
  addCapture,
  getAllCaptures,
  getCapturesById,
  updateCaptureById,
  deleteCaptureById,
};
