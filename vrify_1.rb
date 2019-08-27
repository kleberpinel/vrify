# frozen_string_literal: true

# In a web programming language of your choice, provide code and tests for a
# method which multiplies a value by 321, without using loops, the multiply
# operator, or divide operator.
class Calc
  FACTOR = 321

  def self.multiply(value)
    return 0 if value.zero?

    return (FACTOR + multiply(value - 1)) if value.positive?

    return -multiply(-value) if value.negative?

    -1
  end
end

# Could created an rspec test, but this is just to run and see that is working
(1..100).each do |value|
  puts 'Multiply error' unless Calc.multiply(value) == Calc::FACTOR * value
end
