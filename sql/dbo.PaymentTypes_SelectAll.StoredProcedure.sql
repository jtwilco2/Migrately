CREATE proc [dbo].[PaymentTypes_SelectAll]

	/*		 -- Test Code --
			execute dbo.PaymentTypes_SelectAll
	*/

as	

begin

	SELECT Id
		  ,PaymentType
	FROM dbo.PaymentTypes

end



GO
