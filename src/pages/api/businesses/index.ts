import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { businessValidationSchema } from 'validationSchema/businesses';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getBusinesses();
    case 'POST':
      return createBusiness();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getBusinesses() {
    const data = await prisma.business
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'business'));
    return res.status(200).json(data);
  }

  async function createBusiness() {
    await businessValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.appointment?.length > 0) {
      const create_appointment = body.appointment;
      body.appointment = {
        create: create_appointment,
      };
    } else {
      delete body.appointment;
    }
    if (body?.cash_box?.length > 0) {
      const create_cash_box = body.cash_box;
      body.cash_box = {
        create: create_cash_box,
      };
    } else {
      delete body.cash_box;
    }
    if (body?.product?.length > 0) {
      const create_product = body.product;
      body.product = {
        create: create_product,
      };
    } else {
      delete body.product;
    }
    const data = await prisma.business.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
