CREATE proc [dbo].[StripeSubscriptions_SelectByUserIdV2]
			@UserId int

			/* TEST CODE
			DECLARE @UserId int = 77

			EXECUTE [dbo].[StripeSubscriptions_SelectByUserIdV2] @UserId
			
			*/
as

begin
			SELECT TOP 1 sub.SubscriptionId
				  ,cust.CustomerId
			  FROM dbo.StripeSubscriptions as sub
			  INNER JOIN dbo.StripeCustomers as cust
			  ON sub.CustomerId = cust.Id
			  ORDER BY sub.Id DESC


end




GO
