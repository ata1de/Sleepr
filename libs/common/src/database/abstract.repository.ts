import { Logger, NotFoundException } from '@nestjs/common';
import { FilterQuery, Model, Types, UpdateQuery } from 'mongoose';
import { AbstractDocument } from './abstract.schema';

export class AbstractRepository<TDocument extends AbstractDocument> {
  protected readonly logger: Logger;

  constructor(protected readonly model: Model<TDocument>) {}

  async create(createDto: Omit<TDocument, '_id'>) {
    const createDocument = new this.model({
      ...createDto,
      _id: new Types.ObjectId(),
    });

    return (await createDocument.save()).toJSON();
  }

  async findAll(filterQuery: FilterQuery<TDocument>): Promise<TDocument[]> {
    return this.model.find(filterQuery).lean<TDocument[]>(true);
  }

  async findOne(filterQuery: FilterQuery<TDocument>) {
    const document = this.model.findOne(filterQuery).lean<TDocument>(true);

    if (!document) {
      this.logger.warn('Document not found');
      throw new NotFoundException('Document not found');
    }

    return document;
  }

  async findAndUpdate(
    filterQuery: FilterQuery<TDocument>,
    updateQuery: UpdateQuery<TDocument>,
  ) {
    const document = this.model
      .findByIdAndUpdate(filterQuery, updateQuery, {
        new: true,
      })
      .lean<TDocument>(true);

    if (!document) {
      this.logger.warn('Document not found with findAndUpdateQuery');
      throw new NotFoundException('Document not found');
    }

    return document;
  }

  async findAndDelete(filterQuery: FilterQuery<TDocument>) {
    const document = this.model
      .findByIdAndDelete(filterQuery)
      .lean<TDocument>(true);

    if (!document) {
      this.logger.warn(
        'Document not found and deleted with findAndDeleteQuery',
      );
      throw new NotFoundException('Document not found');
    }

    return document;
  }
}
