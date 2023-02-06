CREATE proc [dbo].[StripeCustomers_GetById]

		@UserId int
		/* Test Code

		Declare @UserId int = 77
		execute dbo.StripeCustomers_GetById @UserId
		
		*/
as
begin

		SELECT UserId
			  ,CustomerId
		  FROM dbo.StripeCustomers
		  WHERE UserId = @UserId


end


GO
