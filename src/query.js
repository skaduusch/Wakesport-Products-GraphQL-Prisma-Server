import { idArg, queryType, stringArg } from 'nexus';

export const Query = queryType({
	definition(t) {
		t.field('Product', {
			type: 'Product',
			nullable: true,
			args: { id: idArg() },
			resolve: (parent, { id }, ctx) => {
				return ctx.prisma.product.findOne({
					where: {
						id,
					},
				});
			},
		});

		t.list.field('Products', {
			type: 'Product',
			args: {
				searchString: stringArg({ nullable: true }),
			},
			resolve: (parent, { searchString }, ctx) => {
				return ctx.prisma.product.findMany({
					where: {
						OR: [
							{ name: { contains: searchString } },
							{ description: { contains: searchString } },
							// { description: { match: /searchString/gi } },
						],
					},
				});
			},
		});

		t.list.field('Wakeboards', {
			type: 'Product',
			// args: { category: stringArg() },
			resolve: (parent, { category }, ctx) => {
				return ctx.prisma.product.findMany({
					where: {
						category: {
							equals: 'Wakeboards',
						},
					},
				});
			},
		});

		t.list.field('Category', {
			type: 'Product',
			args: { category: stringArg() },
			resolve: (parent, { category }, ctx) => {
				return ctx.prisma.product.findMany({
					where: {
						category: {
							equals: category,
						},
					},
				});
			},
		});

	},
});
