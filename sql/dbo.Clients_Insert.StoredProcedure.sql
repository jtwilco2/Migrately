CREATE proc [dbo].[Clients_Insert]
				@Email nvarchar(255)
				,@FirstName nvarchar(100)
				,@LastName nvarchar(100)
				,@Mi nvarchar(2)
				,@GenderTypeId int
				,@LocationTypeId int
			    ,@LineOne nvarchar(255)
			    ,@LineTwo nvarchar(255)
 			    ,@City nvarchar(255)
 			    ,@Zip nvarchar(50)
			    ,@StateId int
			    ,@Latitude float
			    ,@Longitude float
				,@Landline nvarchar(25)
				,@Mobile nvarchar(25)
				,@CreatedBy int
				,@ModifiedBy int
				,@ClientId int OUTPUT

AS

/*----- TEST CODE -----

	Declare @ClientId int = 0

	DECLARE @Email nvarchar(255) = 'example@example.com'
			,@FirstName nvarchar(100) = 'Jon'
			,@LastName nvarchar(100) = 'doe'
			,@Mi nvarchar(2) = 'a'
			,@GenderTypeId int = '1'
			,@LocationTypeId int = '1'
		    ,@LineOne nvarchar(255) = '123 North Main Street'
		    ,@LineTwo nvarchar(255) = ''
 		    ,@City nvarchar(255) = 'Philadelphia'
 		    ,@Zip nvarchar(50) = '19101'
		    ,@StateId int = '39'
		    ,@Latitude float = '39.9526'
		    ,@Longitude float = '75.1652'
			,@Landline nvarchar(25) = '555-555-5555'
			,@Mobile nvarchar(25) = '555-555-5555'
			,@CreatedBy int = '8'
			,@ModifiedBy int = '8'

	EXECUTE dbo.Clients_Insert
			@Email
			,@FirstName
			,@LastName
			,@Mi
			,@GenderTypeId
			,@LocationTypeId
		    ,@LineOne
		    ,@LineTwo
 		    ,@City
 		    ,@Zip
		    ,@StateId
		    ,@Latitude
		    ,@Longitude
			,@Landline
			,@Mobile
			,@CreatedBy
			,@ModifiedBy
			,@ClientId OUTPUT

	SELECT * FROM dbo.Clients
	WHERE Id = @ClientId

	select * from dbo.clientAttorney
	where clientId = @ClientId

*/

BEGIN
	
	DECLARE @LocationId int
	EXECUTE dbo.Locations_Insert 
				 @LocationTypeId
				,@LineOne
				,@LineTwo
				,@City
				,@Zip
				,@StateId
				,@Latitude
				,@Longitude				
				,@CreatedBy
				,@ModifiedBy
				,@LocationId OUTPUT

	INSERT INTO dbo.Clients
			   (Email
			   ,FirstName
			   ,LastName
			   ,Mi
			   ,GenderTypeId
			   ,LocationId
			   ,Landline
			   ,Mobile
			   ,CreatedBy
			   ,ModifiedBy
			   ,IsActive)
		 VALUES
				(@Email
				,@FirstName
				,@LastName
				,@Mi
				,@GenderTypeId
				,@LocationId
				,@Landline
				,@Mobile
				,@CreatedBy
				,@ModifiedBy
				,1)
		SET @ClientId = SCOPE_IDENTITY()

	EXECUTE dbo.ClientAttorney_Insert_ByAttorneyUserId
							@ClientId
							,@CreatedBy

END
GO
