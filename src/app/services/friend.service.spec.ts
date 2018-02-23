import { TestBed, inject } from '@angular/core/testing';

import { FriendService } from './friend.service';

describe('FriendServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FriendService]
    });
  });

  it('should be created', inject([FriendService], (service: FriendService) => {
    expect(service).toBeTruthy();
  }));
});
