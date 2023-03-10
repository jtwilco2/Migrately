CREATE proc [dbo].[StripeSubscriptions_SelectByUserId]
			@UserId int

			/* Test Code
			Declare @UserId int = 77

			execute [dbo].[StripeSubscriptions_SelectByUserId] @UserId

			*/
as

begin

		SELECT TOP 1 sub.Id
				,prod.Name
		  FROM dbo.StripeSubscriptions as sub
		  INNER JOIN dbo.StripeProductSubscription as pro
		  ON sub.Id = pro.SubscriptionId
		  INNER JOIN dbo.StripeProducts as prod
		  ON pro.ProductId = prod.Id
		  WHERE sub.UserId = @UserId
		  ORDER BY sub.Id DESC

end



GO
