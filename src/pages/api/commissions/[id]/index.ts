import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { commissionValidationSchema } from 'validationSchema/commissions';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.commission
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getCommissionById();
    case 'PUT':
      return updateCommissionById();
    case 'DELETE':
      return deleteCommissionById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getCommissionById() {
    const data = await prisma.commission.findFirst(convertQueryToPrismaUtil(req.query, 'commission'));
    return res.status(200).json(data);
  }

  async function updateCommissionById() {
    await commissionValidationSchema.validate(req.body);
    const data = await prisma.commission.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteCommissionById() {
    const data = await prisma.commission.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
