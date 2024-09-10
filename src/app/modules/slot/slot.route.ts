import express from 'express';
import { SlotController } from './slot.controller';

const router = express.Router();

router.get('/availability', SlotController.getSlot);

export const SlotRoutes = router;
