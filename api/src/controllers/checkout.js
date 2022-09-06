const stripe = require('stripe')("sk_test_51Les4YKH7XmQskrVxo1Th9dZWzcjEynmqRUGSXByXhtBh7JbT3Zhvg4JATIIJAKP0XxhPkT1dLO9UdHDhoEiQKm100gdCLwxqr")
const CLIENT = 'http://localhost:3000';

const Checkout = async (req, res) => {
  const { id, cartProducts} = req.body;
    const line_items = cartProducts?.map(item => {
      return {
        price_data: {
            currency: 'usd',
            product_data: {
              name: item.name,
              images: [item.image_link],
              description: item.description,
              metadata:{
                id: item.id,
                brand: item.brand
              }
            },
            unit_amount: item.price * 100,
          },
          quantity: item.quantity,
        }
    })

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      shipping_address_collection: {
        allowed_countries: ['US', 'CA', 'MX', 'AR', 'BR', 'CL', 'CO', 'PE', 'UY', 'VE'],
      },
    shipping_options: [
      {
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: {
            amount: 0,
            currency: 'usd',
          },
          display_name: 'Free shipping',
          delivery_estimate: {
            minimum: {
              unit: 'business_day',
              value: 5,
            },
            maximum: {
              unit: 'business_day',
              value: 7,
            },
          }
        }
      },
      {
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: {
            amount: 2500,
            currency: 'usd',
          },
          display_name: 'Fast shipping',
          delivery_estimate: {
            minimum: {
              unit: 'business_day',
              value: 1,
            },
            maximum: {
              unit: 'business_day',
              value: 3,
            },
          }
        }
      },
    ],
      line_items,
      mode: 'payment',
      success_url: `${CLIENT}/checkout/success`,
      cancel_url: `${CLIENT}/cart`,
    });
    res.send({url: session.url});
}

module.exports = {
  Checkout
};
