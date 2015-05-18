'use strict';

describe('Card', function () {
  it('should be created with an encrypted value', function () {
    spyOn(Cards, 'insert').and.callFake(function(doc, callback) {
      // simulate async return of id = '1';
      callback(null, '1');
    });

    // encrypted string of card 4242 4242 4242 4242 is the new card for test
    var card = new Card(null, 'c01d4b5b46532974388e5c366fe602e9');

    expect(card.card).toBe('c01d4b5b46532974388e5c366fe602e9');

    card.insertCard();

    // id should be defined
    expect(card.id).toEqual('1');
    expect(Cards.insert).toHaveBeenCalledWith({card: 'c01d4b5b46532974388e5c366fe602e9'}, jasmine.any(Function));
  });
});
