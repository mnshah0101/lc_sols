# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def pairSum(self, head: Optional[ListNode]) -> int:
        slow = head
        fast = head

        while fast and fast.next:
            fast = fast.next.next
            slow = slow.next
        #reverse from slow
        prev = None
        while slow:
            next_ = slow.next
            slow.next = prev
            prev = slow
            slow = next_
        max_sum  = 0 
        fast = head
        slow = prev
        while slow and fast:
            max_sum = max(max_sum, slow.val + fast.val)
            slow = slow.next
            fast = fast.next
        return max_sum



        