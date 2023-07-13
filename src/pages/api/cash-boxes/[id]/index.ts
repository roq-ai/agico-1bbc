import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { cashBoxValidationSchema } from 'validationSchema/cash-boxes';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.cash_box
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getCashBoxById();
    case 'PUT':
      return updateCashBoxById();
    case 'DELETE':
      return deleteCashBoxById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getCashBoxById() {
    const data = await prisma.cash_box.findFirst(convertQueryToPrismaUtil(req.query, 'cash_box'));
    return res.status(200).json(data);
  }

  async function updateCashBoxById() {
    await cashBoxValidationSchema.validate(req.body);
    const data = await prisma.cash_box.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteCashBoxById() {
    const data = await prisma.cash_box.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
