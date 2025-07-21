# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
import math

class Solution:
    @lru_cache(None)
    def algo(self, a,b):
        if b == 0:
            return a
        return self.algo(b, a % b)

    def insertGreatestCommonDivisors(self, head: Optional[ListNode]) -> Optional[ListNode]:
        if not head or not head.next:
            return head
        curr = head

        while curr and curr.next:
            next_ = curr.next
            a = curr.val
            b = curr.next.val
            new = ListNode(self.algo(a,b))
            curr.next = new
            new.next = next_
            curr = next_
        
        return head

        
    