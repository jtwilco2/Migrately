CREATE proc [dbo].[Clients_Update]				
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
				,@Createdby int
				,@ModifiedBy int
				,@IsActive bit
				,@ClientId int
				

AS

/*----- TEST CODE -----

	DECLARE @Email nvarchar(255) = 'example@example.com'
			,@FirstName nvarchar(100) = 'jonUpdate'
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
			,@Createdby int = '8'
			,@ModifiedBy int = '8'
			,@IsActive bit = '1'
			,@ClientId int = '30'
			

	SELECT * FROM dbo.Clients
	WHERE Id = @Id

	EXECUTE dbo.Clients_Update
				,@Email
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
				,@Createdby
				,@ModifiedBy
				,@IsActive
				,@ClientId
				

	SELECT * FROM dbo.Clients
	WHERE Id = @Id

	select * from dbo.clientAttorney

*/

BEGIN	
	
	DECLARE @dateNow datetime2 = getutcdate();
	DECLARE @LocationId int =(SELECT LocationId 
							   FROM dbo.Clients
							   WHERE Id = @ClientId)

	Execute dbo.Locations_Update
				@LocationTypeId 
			    ,@LineOne 
			    ,@LineTwo 
			    ,@City 
	 		    ,@Zip 
			    ,@StateId 
			    ,@Latitude 
			    ,@Longitude 
			    ,@Createdby
			    ,@ModifiedBy
			    ,@LocationId
	
	UPDATE dbo.Clients
	SET	Email = @Email
	   ,FirstName = @FirstName
	   ,LastName = @LastName
	   ,Mi = @Mi
	   ,GenderTypeId = @GenderTypeId
	   ,LocationId = @LocationId
	   ,Landline = @Landline
	   ,Mobile = @Mobile
	   ,DateModified = @dateNow
	   ,ModifiedBy = @ModifiedBy
	   ,CreatedBy = @Createdby
	   ,IsActive = @IsActive
	WHERE Id = @ClientId

	Execute ClientAttorney_Update_ByAttorneyUserId
							@ClientId
							,@CreatedBy	
END
GO
